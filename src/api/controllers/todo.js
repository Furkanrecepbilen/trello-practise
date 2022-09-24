const TodoModel = require("../models/todo");
const createBaseResponse = require("../utils/baseResponse");
const ERROR_CODES = require("../common/errorCodes");
const todo = require("../models/todo");
const CommentModel = require("../models/comment");

exports.createTodo = async (req, res, next) => {
  try {
    const body = req.body;
    const todo = await TodoModel.create({ ...body, user: req.user.id });
    if (todo) {
      return res
        .status(200)
        .json(
          createBaseResponse(false, body, undefined, req.headers["language"])
        );
    } else {
      throw { message: ERROR_CODES.ERR_00006 };
    }
  } catch (err) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          err.message,
          req.headers["language"]
        )
      );
  }
};

exports.listTodo = async (req, res, next) => {
  try {
    const todos = await TodoModel.find();

    if (todos) {
      return res
        .status(200)
        .json(
          createBaseResponse(false, todos, undefined, req.headers["language"])
        );
    } else {
      throw { message: ERROR_CODES.ERR_00007 };
    }
  } catch (err) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          err.message,
          req.headers["language"]
        )
      );
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { header, content, deadLine } = req.body;
    let todo = await TodoModel.findById(id);

    if (todo) {
      todo.header = header;
      todo.content = content;
      todo.deadLine = deadLine;
      await todo.save();

      return res
        .status(200)
        .json(
          createBaseResponse(false, todo, undefined, req.headers["language"])
        );
    } else {
      throw { message: ERROR_CODES.ERR_00007 };
    }
  } catch (err) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          err.message,
          req.headers["language"]
        )
      );
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    await TodoModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json(
        createBaseResponse(
          false,
          { message: "Delete successfully completed" },
          undefined,
          req.headers["language"]
        )
      );
  } catch (err) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          err.message,
          req.headers["language"]
        )
      );
  }
};

exports.createComment = (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const comment = CommentModel.create({ ...body, todo: id, user: req.id });
    if (comment) {
      return res
        .status(200)
        .json(
          createBaseResponse(false, body, undefined, req.headers["language"])
        );
    } else {
      throw { message: ERROR_CODES.ERR_00008 };
    }
  } catch (err) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          err.message,
          req.headers["language"]
        )
      );
  }
};

exports.likeTodo = (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = TodoModel.findById(id);
    todo.likes.push(req.user.id);
    todo.likeCount = todo.likes.length;
    todo.save();
    if (todo) {
      return res
        .status(200)
        .json(
          createBaseResponse(false, todo, undefined, req.headers["language"])
        );
    } else {
      throw { message: ERROR_CODES.ERR_00008 };
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          err.message,
          req.headers["language"]
        )
      );
  }
};
