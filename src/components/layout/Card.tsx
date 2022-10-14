const Card = (props: { className?: string; children?: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) => {
  return (
    <article
      onClick={props.onClick}
      className={`mb-5 flex w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 ${props.className}`}
    >
      <div className="m-1 flex h-full w-11/12 flex-col items-center  rounded border border-indigo-500 p-2 backdrop-brightness-110 ">
        {props.children}
      </div>
    </article>
  );
};

export default Card;
