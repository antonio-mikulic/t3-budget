import { Expense } from '@prisma/client';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import xlsx from 'xlsx';
import { prisma } from '../../../server/db/client';
import { authOptions as nextAuthOptions } from '../auth/[...nextauth]';

export const config = {
  api: {
    bodyParser: false,
  },
};

// TODO Refactor for readability
const ImportWallet = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    res.send({
      error: 'You must be signed in to view the protected content on this page.',
    });
    return;
  }

  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (_err, _fields, files) {
      await saveFile(files.file);
    });

    const saveFile = async (file: formidable.File | formidable.File[] | undefined) => {
      if (!file) {
        res.send({
          error: 'No file uploaded',
        });
        return;
      }

      if (Array.isArray(file)) {
        res.send({
          error: 'This endpoint expects only one file',
        });
        return;
      }

      if (!file.originalFilename?.includes('.xlsx')) {
        res.send({
          error: 'This endpoint expects only .xlsx files',
        });
        return;
      }

      try {
        const workbook = xlsx.readFile(file.filepath, {
          cellDates: true,
        });

        const billsSheet = workbook.Sheets[workbook.SheetNames[0] ?? 'Bills'];
        if (!billsSheet) {
          res.send({
            error: 'No Bills sheet found',
          });
          return;
        }

        const categories = await prisma.category.findMany();
        const wallets = await prisma.wallet.findMany();

        const pureRows: (Expense | null)[] = xlsx.utils
          .sheet_to_json(billsSheet, { header: 1, blankrows: false })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((row: any, index: number) => {
            if (index === 0) {
              return null;
            }

            return {
              userId: session.user?.id,
              date: new Date(row[0]),
              walletId: wallets.find((w) => w.name === row[1])?.id ?? '',
              categoryId: categories.find((c) => c.name === row[2])?.id ?? '',
              expense: row[3],
              description: row[7].toString(),
              location: row[6],
              currency: row[4],
              expenseEuro: row[5],
            } as Expense;
          });

        const validRows: Expense[] = [];
        const errors = [];

        for (const row of pureRows) {
          if (row === null) {
            continue;
          }

          if (!row.categoryId || !row.walletId) {
            errors.push('Could not parse row: ' + JSON.stringify(row));
          } else {
            validRows.push(row);
          }
        }

        if (errors.length > 0) {
          res.send({
            error: errors,
          });
          return;
        }

        const result = await prisma.expense.createMany({
          data: validRows,
          skipDuplicates: true,
        });

        res.send({ message: `Successfully imported ${result.count}/${validRows.length} expenses` });
        return;
      } catch (e) {
        console.error(e);
        res.send({
          error: 'Error reading file',
        });
      }
    };
  } catch {
    res.send({
      error: 'Could not parse given file',
    });
  }
};

export default ImportWallet;
