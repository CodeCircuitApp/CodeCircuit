const Joi = require("joi");

const eventSchema = Joi.object({
  // General Information
  name: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  technology: Joi.array().items(Joi.string()).required(),
  locationType: Joi.string().valid("online", "local", "hybrid").required(),
  type: Joi.string()
    .valid("hackathon", "workshop", "conference", "other")
    .required(),
  description: Joi.string().required(),
  days: Joi.number().required(),
  entryFee: Joi.number().required(),
  prizePool: Joi.number().required(),
  currency: Joi.string().valid("USD", "PLN", "EUR").required(),
  skillLevel: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .required(),
  // Optional Location Information
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    postalCode: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  // Organizer Information
  organizer: Joi.string().required(),
  website: Joi.string().uri().required(),
  email: Joi.string().email().required(),
  imageUrl: Joi.string().uri().required(),
  logoUrl: Joi.string().uri().required(),
  // Eligibility Criteria Information
  educationStatus: Joi.array()
    .items(
      Joi.string().valid(
        "nonStudent",
        "primarySchoolStudent",
        "secondarySchoolStudent",
        "higherEducationStudent",
        "postGraduate"
      )
    )
    .required(),
  minimumAge: Joi.number().integer().min(0).required(),
  maximumAge: Joi.number().integer().min(0).optional(),
  minimumTeamSize: Joi.number().integer().min(1).optional(),
  maximumTeamSize: Joi.number().integer().min(1).optional(),
}).options({ stripUnknown: true });

module.exports = eventSchema;
