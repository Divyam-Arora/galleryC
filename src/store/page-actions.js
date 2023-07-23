export const initialPageState = {
  page: -1,
  hasNext: true,
  initialRequest: false,
  totalPages: 0,
  totalElements: 0,
  extra: 0,
  refresh: false,
  list: [],
};

export const newItem = (state, action) => {
  empty(state);
  state.item = action.payload.item;
  if (state.search) state.search = "";
};

export const updateItem = (state, action) => {
  state.item = {
    ...state.item,
    ...action.payload.item,
  };
};

export const fill = (state, action) => {
  state.list = [...action.payload.list];
  if (action.payload.list.length > 0) {
    state.page = action.payload.page;
    state.hasNext = action.payload.hasNext;
  }
  state.initialRequest = true;
  state.totalPages = action.payload.totalPages;
  state.totalElements = action.payload.totalElements;
  state.extra = 0;
  state.refresh = false;
};

export const append = (state, action) => {
  if (state.refresh) {
    state.list = [...action.payload.list];
    state.refresh = false;
  } else state.list.push(...action.payload.list);

  if (action.payload.list.length > 0) {
    state.page = action.payload.page;
    state.hasNext = action.payload.hasNext;
  }
  state.initialRequest = true;
  state.totalPages = action.payload.totalPages;
  state.totalElements = action.payload.totalElements;
  state.extra = 0;
};

export const empty = (state) => {
  state.list = [];
  state.page = -1;
  state.initialRequest = false;
  state.hasNext = true;
  state.totalPages = 0;
  state.totalElements = 0;
  state.extra = 0;
};

export const reset = (state) => {
  empty(state);
  if (state.search) state.search = "";
  if (state.item) state.item = null;
};

export const refresh = (state) => {
  console.log("inside refresh");
  state.refresh = true;
  state.page = -1;
  state.hasNext = true;
};

export const add = (state, action) => {
  if (state.list.length != 0) {
    if (Array.isArray(action.payload.list)) {
      state.extra += action.payload.list.length;
      state.totalElements += action.payload.list.length;
      state.list.unshift(...action.payload.list);
    } else {
      state.extra++;
      state.totalElements++;
      state.list.unshift(action.payload.item);
    }
  } else {
    refresh(state);
  }
};

export const remove = (state, action) => {
  if (Array.isArray(action.payload.list)) {
    if (state.list.length != state.totalElements)
      state.extra -= action.payload.list.length;
    else state.totalElements -= action.payload.list.length;
    state.list = state.list.filter(
      (item) => !action.payload.list.some((val) => val.id == item.id)
    );
  } else {
    console.log(action.payload.id);
    if (state.list.length != state.totalElements) state.extra--;
    else state.totalElements--;
    state.list = state.list.filter((item) => action.payload.id != item.id);
  }
};

export const updateOrAdd = (state, action) => {
  const albumIndex = state.list.findIndex(
    (val) => val.id == action.payload.item.id
  );

  if (albumIndex == -1) {
    if (state.list.length != state.totalElements || state.hasNext)
      state.extra++;
    else state.totalElements++;
    state.list.unshift(action.payload.item);
  } else {
    state.list[albumIndex] = {
      ...state.list[albumIndex],
      ...action.payload.item,
    };
  }
};

export const update = (state, action) => {
  if (action.payload.isListItem) {
    const albumIndex = state.list.findIndex(
      (val) => val.id == action.payload.item.id
    );
    state.list[albumIndex] = {
      ...state.list[albumIndex],
      ...action.payload.item,
    };
  } else {
    if (state.item.id == action.payload.item.id) {
      console.log(state, action);
      Object.keys(action.payload.item).forEach((key) => {
        state.item[key] = action.payload.item[key];
      });
    }
  }
};

export const updateRecent = (state, action) => {
  state.list = state.list.filter(
    (item) => !action.payload.list.some((val) => val.id == item.id)
  );
  state.list.unshift(...action.payload.list);
};

export const search = (state, action) => {
  if (state.search != action.payload.search) {
    state.search = action.payload.search;
    empty(state);
  }
};
