import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator(mail) { return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(mail); }
      },
      required: true,
      unique: true
    },
    password: String,
    profile: {
      name: String,
      gender: String,
      address: String,
      picture: String
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

userSchema.pre('save', function (next) {
  // tslint:disable-next-line:no-var-self
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', userSchema);
