export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectUser = (state: any) => state.auth.user;
export const selectIsRefreshing = (state: any) => state.auth.isRefreshing;

export const selectContacts = (state: any) => state.contacts.contacts;
export const selectStatus = (state: any) => state.contacts.status;
export const selectError = (state: any) => state.contacts.error;
