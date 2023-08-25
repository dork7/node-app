exports.storeData = async (key, data) => {
    try {
      const key = req.params.key;
      const value = req.body;
      redisClient.set(key, JSON.stringify(value));
      redisClient.expire(key, 5);
      res.json({ message: "Value set", key });
    } catch (error) {
      return next(error);
    }
  };
  exports.getData = async (key) => {
    try {
      const key = req.params.key;
      const val = await redisClient.get(key);
      res.json(JSON.parse(val));
    } catch (error) {
      return next(error);
    }
  };
  