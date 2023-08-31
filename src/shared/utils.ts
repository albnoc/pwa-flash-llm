export function getColor(index: number): string {
  const colors = [
    '#FAD02E',
    '#F28D35',
    '#D83367',
    '#635DFF',
    '#508BF9',
    '#2EC5CE',
    '#2ECC71',
    '#FEC007',
    '#FC5C65',
    '#26de81',
  ];
  return colors[index % colors.length];
}
