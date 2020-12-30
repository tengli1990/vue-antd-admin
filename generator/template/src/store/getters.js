const getters = {
  // app
  locale: state => state.app.locale,
  sideCollapsed: state => state.app.sideCollapsed,
  isMobile: state => state.app.isMobile,
  // user
  token: state => state.user.token,
  roles: state => state.user.roles,
  user: state => state.user.user,
  permissions: state => state.user.permissions,
  // permission
  addRoutes: state => state.permission.addRoutes,
  permissionRoutes: state => state.permission.routes
}

export default getters
