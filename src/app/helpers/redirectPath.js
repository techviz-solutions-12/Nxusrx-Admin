

export const redirectPath = (user, history) => {
    if (user && user?.email) {

        history("/dashboard");
    }
};
