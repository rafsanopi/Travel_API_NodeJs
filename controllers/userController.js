const fs = require('fs');

const userList = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUser = (req, res) => {
  res.status(200).json({
    createdAt: req.requestTime,
    status: 'Success',
    request: userList.length,
    data: userList,
  });
};

exports.getSingleUser = (req, res) => {
  const id = req.params.id;

  // if (id > userList.length) {
  //   return res.status(404).json({
  //     status: 'false',
  //     message: 'Tour list not found',
  //   });
  // }

  const user = userList.find((map) => map._id === id);
  res.status(200).json({
    status: 'Success',
    message: 'User list Success',
    data: user,
  });

  // console.log(req.params);
};
