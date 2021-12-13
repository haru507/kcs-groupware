export const initialState = {
  users: {
    isSignedIn: false,
    user_id: '',
    name: '',
    password: '',
    auth: false,
    email: ''
  },
  loading: {
    state: false,
    text: ""
  },
  tasks: {
    lists: []
  },
  groups: {
    lists: []
  },
  chats: {
    lists: []
  },
  chatrooms: {
    lists: []
  },
}