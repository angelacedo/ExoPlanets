interface TopCardProp
{
    title: string,
    data: number;
    icon: JSX.Element;
}
const TopCard: React.FC<TopCardProp> = ({ title, data, icon }) =>
{
    return (
        <div className="flex items-center w-[45%] sm:w-[25%] m-2 p-3 rounded-lg bg-[var(--generic-text-color)] h-[80px] shadow-md lg:max-w-[30%]">
            <div className="w-[60%]">
                <p className="text-md" color="var(--generic-text-color-black)">{title}</p>
                <p className="font-bold text-sm">{data}</p>
            </div>
            <div className="flex justify-center items-center ml-auto w-[40px] h-[40px] bg-color-top-card rounded-lg">
                {icon}
            </div>
        </div>
    );
};
export default TopCard;