function normalizeLocation(location) {
  return {
    state: location.stateSlug,
    city: location.citySlug,
    neightborhood: location.name
  }
}

export {
  normalizeLocation
}
