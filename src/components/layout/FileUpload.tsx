import { useState, type ChangeEvent } from 'react';
import Button, { ButtonType } from './Button';

const FileUpload = (props: { title: string; url: string; onUpload: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const i = event.target.files[0];

      setFile(i);
    }
  };

  const uploadToServer = async () => {
    if (!file) return;
    setIsLoading(true);

    const body = new FormData();
    body.append('file', file);

    try {
      const response = await fetch(props.url, {
        method: 'POST',
        body,
      });

      props.onUpload();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const message = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setError(message?.body?.error ?? '');
    } catch (_e) {
      setError('Unknonw error occured. Please try again later.');
    } finally {
      setIsLoading(false);
      setFile(null);
    }
  };

  // TODO Improve UI UX and then display this component
  return (
    <div className="hidden">
      <input type="file" name="upload" onChange={uploadToClient} />
      <Button type="button" onClick={() => void uploadToServer()} disabled={!file || isLoading} role={ButtonType.Secondary}>
        {props.title}
      </Button>

      {error && <div>{error}</div>}
    </div>
  );
};
export default FileUpload;
