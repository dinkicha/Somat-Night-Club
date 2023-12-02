export function Error(error) {
  let errors = [];
  if (error.name == "FirebaseError") {
    errors.push(error.message);
  } else {
    errors = error.message.split("\n");
  }
  return errors;
}
