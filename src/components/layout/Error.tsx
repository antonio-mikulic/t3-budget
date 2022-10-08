const CustomError = (props: { error?: string }) => {
    return <section>{props.error && <p>Error: {props.error}</p>}</section>;
};

export default CustomError;
