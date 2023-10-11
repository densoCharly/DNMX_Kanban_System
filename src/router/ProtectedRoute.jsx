// import React from 'react'

// const ProtectedRoute = ({
//     isAllowed,
//     redirectPath = '/login',
//     children,
// }) => {
//     if (!isAllowed) {
//         return <Navigate to={redirectPath} replace />;
//     }
    
//     return children ? children : <Outlet />;
// }

// export default ProtectedRoute