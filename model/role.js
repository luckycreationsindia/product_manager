const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {timestamps: true, collection: 'roles'});

RoleSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const Role = mongoose.model(
    "Role",
    RoleSchema,
    "roles"
);

module.exports = Role;