package store

import (
	"github.com/bbhasiapacific/bbhoi.com/debug"
)

const (
	createFriendSQL = `
	user1_id int NOT NULL,
	user2_id int NOT NULL`
)

func GetFriends(userID int64) ([]User, error) {
	const rawSQL = `
	SELECT user_.* FROM user_
	INNER JOIN friend ON user_.id = friend.user1_id`

	return queryUsers(rawSQL)
}

func AddFriend(userID, otherUserID int64) error {
	const rawSQL = `
	INSERT IGNORE INTO friend
	VALUES ($1, $2), ($3, $4)`

	if _, err := db.Exec(rawSQL, userID, otherUserID, otherUserID, userID); err != nil {
		return debug.Error(err)
	}

	return nil
}

func RemoveFriend(userID, otherUserID int64) error {
	const rawSQL = `
	DELETE FROM friend
	WHERE (user1_id = $1 AND user2_id = $2)
	OR (user2_id = $1 AND user1_id = $2)`

	if _, err := db.Exec(rawSQL, userID, otherUserID); err != nil {
		return debug.Error(err)
	}

	return nil
}

func IsFriend(userID, otherUserID int64) (bool, error) {
	const rawSQL = `
	SELECT COUNT(*) FROM friend
	WHERE user1_id = $1 AND user2_id = $2`

	return Exists(rawSQL, userID, otherUserID)
}
