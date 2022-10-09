import CustomError from './Error';
import Heading1 from './Heading1';
import Spinner from './Spinner';
import Head from 'next/head';

const Heading = (props: { isLoading: boolean; title: string; error?: string; children?: React.ReactNode }) => {
    return (
        <>
            <Head>
                <title>{props.title}</title>
            </Head>
            <section className="flex items-center justify-between">
                <div className="flex items-center">
                    <Heading1>{props.title}</Heading1>
                    <Spinner isLoading={props.isLoading} size={50}></Spinner>
                </div>
                {props.children}
            </section>

            {props.error && <CustomError error={props.error}></CustomError>}
        </>
    );
};

export default Heading;
