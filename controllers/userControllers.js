const users = require("../schemaAndmodel/userSchema");

//register controller

exports.register = async (req, res) => {
  // res.send('request recieved')
  const { fname, email, mobile, password } = req.body;
  if (!fname || !email || !mobile || !password) {
    res.status(403).json("All inputs are required");
  }

  try {
    preuser = await users.findOne({ email, mobile });
    if (preuser) {
      res.status(406).json("User already exist");
    } else {
      const newUser = new users({
        fname,
        email,
        mobile,
        password,
      });

      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(403).json("All fields required");
  }

  try {
    preuser = await users.findOne({ email, password });
    if (preuser) {
      res.status(200).json(preuser);
    } else {
      res.status(404).json("Incorrect username or password");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.imageUpload = async (req, res) => {
  const { id } = req.params;
  const file = req.file.filename;
  const { description } = req.body;
  try {
    const updatedUser = await users.findByIdAndUpdate(
      { _id: id },
      {
        $push: { collections: { key1: file, key2: description } },
      },
      {
        new: true,
      }
    );

    await updatedUser.save();

    res.status(200).json(updatedUser.collections);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.getUserDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const userProfile = await users.findOne({ _id: id });
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  const indexToDelete = req.body.data;
  console.log(indexToDelete);
  try {
    const deleteImageunset = await users.findByIdAndUpdate(
      { _id: id },
      {
        $unset: {
          [`collections.${indexToDelete}`]: 1,
        },
      },

      {
        new: true,
      }
    );

    await deleteImageunset.save();

    const deleteImagepull = await users.findByIdAndUpdate(
      { _id: id },
      {
        $pull: {
          collections: null,
        },
      },

      {
        new: true,
      }
    );

    await deleteImagepull.save();
    res.status(200).json(deleteImagepull);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.profileUpdate = async (req, res) => {
  const { id } = req.params;
  const { fname, email, mobile, address } = req.body;
  const file = req.file.filename;

  try {
    const updatedProfile = await users.findByIdAndUpdate(
      { _id: id },
      {fname,
      email,
      mobile,
      address,
      profile:file},
      {
        new:true
      }
    );
    await updatedProfile.save()
    res.status(200).json(updatedProfile)
  } catch (error) {
    res.status(200).json(error)
  }
};

exports.getAllUsers=async(req,res)=>{
  try {
    const allUsers=await users.find()
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(401).json(error)
  }
}