import Image from 'next/image';
export const DEFAULT_SPINNER_SIZE = 300;

const Spinner = (props: { isLoading: boolean; removeWrapper?: boolean; wrapperClassName?: string; size?: number }) => {
    if (!props.isLoading) {
        return <></>;
    }

    return (
        <section
            className={`${props.wrapperClassName} ${
                props.removeWrapper ? '' : 'h-full w-full '
            } flex flex-wrap items-center justify-center`}
        >
            <Image
                src="/assets/images/spinner.svg"
                alt="Loading"
                width={props.size ?? DEFAULT_SPINNER_SIZE}
                height={props.size ?? DEFAULT_SPINNER_SIZE}
            />
        </section>
    );
};

export default Spinner;
