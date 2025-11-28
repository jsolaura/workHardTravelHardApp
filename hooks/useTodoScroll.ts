/** ----------------------------
 *  Scroll to Item
--------------------------------*/
export const useTodoScroll = (ref: any) => {
  const scrollToItem = (index: number) => {
    setTimeout(() => {
      ref.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.7,
      });
    }, 80);
  };
  return {
    scrollToItem,
  };
};