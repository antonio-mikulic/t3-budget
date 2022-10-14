export const CurrencyDropdown = (props: { onSelect: (wallet: string) => void }) => {
  const currencies = ['€', 'kn'];

  return (
    <div className="m-0.5 border border-hidden p-0.5 ">
      <select className="text-primary w-full rounded-md px-2 pb-1.5 text-base font-light text-black outline-none">
        {currencies.map((currency) => (
          <option key={currency} value={currency} onClick={() => props.onSelect(currency)}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};
