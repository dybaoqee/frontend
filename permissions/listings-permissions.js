export const canEdit = function(user, listing) {
  return user.admin || listing.owner
}
