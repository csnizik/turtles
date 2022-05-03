interface IContainerProps {
  id: number;
  title: string;
  description: string;
  content: any;
}

const TopFiveContainer = ({
  id,
  title,
  description,
  content,
}: IContainerProps) => {
  return (
    <div className='top-five-container'>
      <h2>{title}</h2>
      <p className='lead margin-top-3 margin-bottom-3'>{description}</p>
      {id <= 1 ? (
        <div className='top-five-box margin-bottom-7'>{content} </div>
      ) : null}
    </div>
  );
};

export default TopFiveContainer;
