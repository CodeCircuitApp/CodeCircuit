function generateFilters(query) {
  const filters = {};

  // Filter by type (array of valid types)
  if (query.type) {
    filters.type = { $in: query.type }; // Matches any of the provided types
  }

  // Filter by locationType (array of valid location types)
  if (query.locationType) {
    filters.locationType = { $in: query.locationType }; // Matches any of the provided location types
  }

  // Filter by educationStatus (array of valid statuses)
  if (query.educationStatus) {
    filters.educationStatus = { $in: query.educationStatus }; // Matches any of the provided statuses
  }

  // Filter by entryFee (true = has entry fee, false = free)
  if (query.entryFee !== undefined) {
    filters.entryFee = query.entryFee ? { $gt: 0 } : { $eq: 0 };
  }

  // Filter by prizePool (true = has prize pool, false = no prize pool)
  if (query.prizePool !== undefined) {
    filters.prizePool = query.prizePool ? { $gt: 0 } : { $eq: 0 };
  }

  // Filter by minimumAge and maximumAge
  if (query.minimumAge !== undefined) {
    filters.minimumAge = { ...filters.minimumAge, $gte: query.minimumAge };
  }
  if (query.maximumAge !== undefined) {
    filters.maximumAge = { ...filters.maximumAge, $lte: query.maximumAge };
  }

  // Filter by minimumTeamSize and maximumTeamSize
  if (query.minimumTeamSize !== undefined) {
    filters.minimumTeamSize = {
      ...filters.minimumTeamSize,
      $gte: query.minimumTeamSize,
    };
  }
  if (query.maximumTeamSize !== undefined) {
    filters.maximumTeamSize = {
      ...filters.maximumTeamSize,
      $lte: query.maximumTeamSize,
    };
  }

  return filters;
}
