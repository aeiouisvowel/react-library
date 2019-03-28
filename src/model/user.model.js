// a prototype for a user
export default class User {
  constructor(email, name, role, profilePic ) {
    this.email = email;
    this.name = name;
    this.role = role;
    this.profilePic = profilePic;
    this.friends = [];
    this.recommends = [];
    this.booksInHand = [];
    this.favCategories = [];
  }
}
