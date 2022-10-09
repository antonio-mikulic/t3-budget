const CardWrapper = (props: { children?: React.ReactNode }) => {
    return <section className="flex w-full flex-wrap">{props.children}</section>;
};

export default CardWrapper;
