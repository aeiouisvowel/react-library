// a prototype for a book
export default class Book {
  constructor() {
    this.bookId = '';
    this.isbn13 = '';
    this.isbn10 = '';
    this.title = '';
    this.author = '';
    this.genre = '';
    this.thumbnail = '';
    this.location = '';
    this.description = '';
    this.availability = {
      availableBy: 'Available',
      issuedTo: '',
      issuedDate: ''
    };
    this.avgRating = {
      rating: 0,
      givenBy: 0
    };
    this.reviews = [];
  }
}
