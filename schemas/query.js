const Joi = require("joi");

const querySchema = Joi.object({
  type: Joi.array()
    .items(Joi.string().valid("hackathon", "workshop", "conference", "other"))
    .optional(),
  locationType: Joi.array()
    .items(Joi.string().valid("online", "local", "hybrid"))
    .optional(),
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
    .optional(),
  entryFee: Joi.boolean().optional(),
  prizePool: Joi.boolean().optional(),
  minimumAge: Joi.number().integer().min(0).optional(),
  maximumAge: Joi.number().integer().min(0).optional(),
  minimumTeamSize: Joi.number().integer().min(1).optional(),
  maximumTeamSize: Joi.number().integer().min(1).optional(),
}).options({ stripUnknown: true });

module.exports = querySchema;
