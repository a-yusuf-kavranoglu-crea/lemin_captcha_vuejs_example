import {createRouter, createWebHistory} from "vue-router"
import SignIn from '@/components/SignIn'
import Success from "@/components/Success";

const routes = [
    {
        name: "SignIn",
        component: SignIn,
        path: "/"
    },
    {
        name: "Success",
        component: Success,
        path: "/success"
    }
];

const routers = createRouter({
    history: createWebHistory(),
    routes
});

export default routers;
