import { create } from "zustand"
import { toast } from "react-hot-toast"
import { axiosInstance } from "../lib/axios.js"

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {

        set({ isUsersLoading: true })
        try {

            const response = await axiosInstance.get("/messages/users")
            const users = response.data.filteredUsers
            set({ users: users })

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }

    },

    getMessages: async (userId) => {

        set({ isMessagesLoading: true })
        try {

            const response = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: response.data.messages })

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesLoading: false })
        }

    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        try {

            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data.newMessage] })

        } catch (error) {

            toast.error(error.response.data.message)

        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser })



}))

