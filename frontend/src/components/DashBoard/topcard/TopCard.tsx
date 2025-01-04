import Loader from "@/components/Loader";

interface TopCardProp
{
    title: string,
    data: number | null | Date;
    icon: JSX.Element;
    classname: string;
}
const TopCard: React.FC<TopCardProp> = ({ title, data, icon, classname }) =>
{
    const dataToShow = () => {
        if (data === null)
            return <p className="font-bold text-xs sm:text-sm">{Loader(true, 15)}</p>;
        else if (data instanceof Date)
            return <p className="font-bold text-xs sm:text-sm">{data.toLocaleString()}</p>;
        else
            return <p className="font-bold text-xs sm:text-sm">{data}</p>;
    }
    return (
        <div className={`flex items-center w-[45%] sm:w-[25%] p-3 rounded-lg bg-[var(--generic-text-color)] h-[80px] shadow-md lg:max-w-[30%] ${classname}`}>
            <div className="w-[60%]">
                <p className="text-md" color="var(--generic-text-color-black)">{title}</p>
                {dataToShow()}
            </div>
            <div className="flex justify-center items-center ml-auto w-[40px] h-[40px] bg-color-top-card rounded-lg">
                {icon}
            </div>
        </div>
    );
};
export default TopCard;