import type { NextPage } from 'next';
import CreateExpense from '../components/expenses/CreateExpense';
import ExpenseList from '../components/expenses/ExpenseList';

const Home: NextPage = () => {
    return (
        <section>
            <CreateExpense />
            <ExpenseList />
        </section>
    );
};

export default Home;
