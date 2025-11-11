

// isAuthenticated 
export const isAuthenticated = async (req, res, next) => {
    try {

    } catch (error) {

    }
};

// isAdmin 
export const isAdmin = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).josn({
            success: false,
            message: "Access Denied : Admin only"
        })
    }
};
