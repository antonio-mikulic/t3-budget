import Image from 'next/image';

const Spinner = (props: { isLoading: boolean }) => {
    if (!props.isLoading) {
        return <></>;
    }

    return (
        <section className="flex h-full w-full flex-wrap items-center justify-center">
            <Image src="/assets/images/spinner.svg" alt="Loading" width="300px" height="300px" />
        </section>
    );
};

export default Spinner;
