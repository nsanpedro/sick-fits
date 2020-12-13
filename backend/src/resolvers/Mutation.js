const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    //TODO: Check if logged in
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info
    );
    return item;
  },

  updateItem(parent, args, ctx, info) {
    //* takes copy of updates
    const updates = { ...args };
    //* remove update ID
    delete updates.id;
    //* run update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    //* 1 - find item!
    const item = await ctx.db.query.item({ where }, `{id title}`);
    //* 2 - check if item exists or permissions
    // TODO
    //* 3 - Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signUp(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = ctx.db.mutation.createUser(
      {
        data: { ...args, password, permissions: { set: ["USER"] } },
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365
    });
    
    return user;
  },
};

module.exports = Mutations;
