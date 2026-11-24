export const List = ({ items }: { items: string[] }): unknown => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>
        {item}
        <img src={item} />
      </li>
    ))}
  </ul>
);

export const useBroken = (flag: boolean): void => {
  if (flag) {
    useBroken(false);
  }
};
