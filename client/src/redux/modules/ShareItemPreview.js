const UPDATE_NEW_ITEM = 'UPDATE_NEW_ITEM';
const RESET_NEW_ITEM = 'RESET_NEW_ITEM';
const RESET_NEW_ITEM_IMAGE = 'RESET_NEW_ITEM_IMAGE';

export const updateNewItem = item => ({
  type: UPDATE_NEW_ITEM,
  payload: item
});

export const resetNewItem = () => ({
  type: RESET_NEW_ITEM
});

export const resetNewItemImage = () => ({
  type: RESET_NEW_ITEM_IMAGE
});

const initialState = {
  title: 'Add a title',
  description: 'Add a description',
  date: new Date(),
  imageurl: 'https://autowiz.in/images/blog-2.jpg',
  ownerid: {},
  tags: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_ITEM: {
      return { ...state, ...action.payload };
    }
    case RESET_NEW_ITEM: {
      return { ...state, initialState };
    }
    case RESET_NEW_ITEM_IMAGE: {
      return { ...state, imageurl: initialState.imageurl };
    }
    default:
      return state;
  }
};
