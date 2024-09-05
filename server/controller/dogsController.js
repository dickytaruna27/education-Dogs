const { Dog } = require("../models/index");
const cloudinary = require("../helper/configCloudinary");
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

class Dogs {
  static async readDataDogs(req, res, next) {
    try {
      const dataDogs = await Dog.findAll();
      res.status(200).json({
        message: "success read data dogs",
        dataDogs,
      });
    } catch (error) {
      next(error);
    }
  }
  static async createDataDog(req, res, next) {
    try {
      console.log(req.loginInfo);
      const { userId } = req.loginInfo;
      const { name, breed, averangeAge, averangeWeight, description, Image } =
        req.body;
      const newDog = await Dog.create({
        name,
        breed,
        averangeAge,
        averangeWeight,
        description,
        Image,
        userId,
      });
      res.status(201).json({
        message: "data dog created successfuly",
        data: newDog,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteDataDog(req, res, next) {
    try {
      const { id } = req.params;
      const dataDogs = await Dog.findByPk(id);
      if (!dataDogs) {
        throw {
          name: "NotFound",
          id,
        };
      }
      await dataDogs.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: "delete success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async uploadImage(req, res, next) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const base64 = file.buffer.toString("base64");
      // console.log(base64);
      const output = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64}`
      );

      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_SECRET);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
              name: {
                type: SchemaType.STRING,
                nullable: false,
              },
              breed: {
                type: SchemaType.STRING,
                nullable: false,
              },
              averangeAge: {
                type: SchemaType.STRING,
                nullable: false,
                description: "average age from image",
              },
              averangeWeight: {
                type: SchemaType.STRING,
                nullable: false,
                description: "average weight from image",
              },
              description: {
                type: SchemaType.STRING,
                nullable: false,
                description: "description of the dog image, like wiki",
              },
            },
          },
        },
      });

      const prompt =
        "please describe this dog with this json {name, breed, averangeAge, averangeWeight, description }, please answer json only, so I can parse in javascript";

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64,
            mimeType: "image/png",
          },
        },
      ]);
      const responseText = await result.response.text();

      console.log(responseText);

      const parsedResponse = JSON.parse(responseText);

      // console.log(parsedResponse);

      res.status(200).json({
        message: "Success upload",
        imageUrl: output.secure_url,
        aiResponse: parsedResponse,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async EditdataDogs(req, res, next) {
    try {
      const { id } = req.params;
      const dataDogs = await Dog.findOne({
        where: {
          id,
        },
      });
      if (!dataDogs) {
        throw {
          name: "NotFound",
        };
      }
      console.log(dataDogs);

      const { name } = req.body;
      console.log(req.body);
      const dogs = await Dog.update(
        {
          name,
        },
        {
          where: {
            id,
          },
          retruning: true,
        }
      );
      res.status(200).json({
        message: `successfully update data Dog`,
        data: dogs[1],
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Dogs;
