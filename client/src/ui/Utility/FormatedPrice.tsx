interface props{
    amount?:number;
    currency?:string;
}
const FormatedPrice = ({amount, currency='USD'}:props) => {
    const formattedAmount = new Number(amount).toLocaleString(
        "en-US",{
            style: "currency", //بنحدد إننا عايزين الرقم يتعرض كعملة.
            currency: currency,
            minimumFractionDigits: 2, 
        }
    )
  return <span>{formattedAmount}</span>;
};

export default FormatedPrice;
