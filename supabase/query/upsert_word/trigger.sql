CREATE TRIGGER trigger_update_word_dictionary_and_user_words
AFTER INSERT ON sentence
FOR EACH ROW
EXECUTE FUNCTION update_word_dictionary_and_user_words();