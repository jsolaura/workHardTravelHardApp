const CATEGORIES = {
  WORK: {
    title: "Work",
    placeholder: "할 일을 추가해보세요!",
    deleteAllConfirmText: "선택한 항목을 삭제하시겠습니까?",
  },
  TRAVEL: {
    title: "Travel",
    placeholder: "가고싶은 여행지를 추가해보세요!",
    deleteAllConfirmText: "선택한 여행지를 삭제하시겠습니까?",
  }
};

const STORAGE_KEY = "@toDos";
const CATEGORY_STORAGE_KEY = "@category";

export { CATEGORIES, CATEGORY_STORAGE_KEY, STORAGE_KEY };
