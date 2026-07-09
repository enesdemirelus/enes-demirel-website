# ReelDuel Privacy Policy

**Effective date:** 9 July 2026
**Last updated:** 9 July 2026

ReelDuel is a party app for picking a movie together. This policy explains exactly what the app collects, why, where it goes, and how long it stays.

ReelDuel has no user accounts. You never give us an email address, a phone number, or a password. We do not sell your data, we do not show ads, and the app contains no analytics, tracking, or advertising software of any kind.

The controller responsible for the data described here is Enes Demirel, reachable at **demireldeveloper@gmail.com**.

---

## What the app collects

**A nickname you choose.** When you join a room you type a display name. Everyone else in that room sees it. Use whatever you like — it does not have to be your real name, and nothing checks that it is.

**A room name.** Whoever creates the room types a name for it. Everyone in the room sees it.

**Your movie picks and your votes.** Which movies you added to the room's pool, and which movie you chose in each head-to-head matchup. These are shared with the room so the group's vote can be tallied. If the host enabled anonymous mode, other players see the tally without seeing who picked which movie.

**An anonymous identifier.** On first launch the app signs in to Firebase Anonymous Authentication, which issues a random ID for your device. This ID is what lets the app tell players in a room apart and stop you from voting twice. It is not linked to your Apple ID, your name, your email, or any other account. It is not shared with anyone but Firebase.

**A short history, stored only on your device.** The app remembers the last 8 rooms you joined — room code, room name, the nickname you used, and the winning movie — so it can offer to rejoin them. This never leaves your phone and is deleted when you uninstall the app.

That is the complete list. The app does not request or receive your location, contacts, photos, camera, microphone, calendar, health data, advertising identifier, or device identifiers.

---

## Who else receives it

**Google (Firebase).** Rooms, nicknames, movie pools, and votes are stored in Google Cloud Firestore so that every player's screen stays in sync in real time. Firebase acts as our data processor. As part of operating the service Google also processes your device's IP address. Google's privacy policy: https://firebase.google.com/support/privacy

**TMDB (The Movie Database).** When you search for a movie, the text you typed is sent to TMDB's API so it can return matching titles, and poster images are loaded from TMDB's image servers. TMDB receives your search text and, as with any web request, your IP address. It does not receive your nickname, your anonymous ID, your votes, or your room. TMDB's privacy policy: https://www.themoviedb.org/privacy-policy

This product uses the TMDB API but is not endorsed or certified by TMDB.

Nobody else. We share data with no other third party, and we never sell it.

---

## How long it is kept

Rooms are ephemeral. Every room and everything inside it — players, movie pools, votes — is stamped with an expiry roughly two hours after the room's last activity, and is then deleted automatically. A host can also end a room immediately, which deletes it and its contents right away. Leaving a room deletes your player record and your movie picks from it.

Your on-device room history holds at most 8 entries and is removed when you delete the app.

The anonymous Firebase ID persists on your device so the app can recognise you across launches. Deleting the app clears it, and the next install issues a new one.

---

## Your choices and rights

Because the app holds no account, the fastest way to remove everything associated with you is to leave your rooms and delete the app. Any room you were in expires on its own within about two hours regardless.

Depending on where you live — for example under the GDPR in the European Economic Area and the UK, or the CCPA in California — you may have the right to request access to your personal data, its correction or deletion, a copy of it in portable form, or to object to its processing. Since we hold no identifiers that connect a room to you as a person, we may be unable to locate your data from a name alone; including your room code helps.

To exercise any of these rights, email **demireldeveloper@gmail.com**. We respond within 30 days.

Our legal basis for processing under the GDPR is legitimate interest: the data listed above is the minimum needed to run a shared voting session between devices, and the app cannot function without it.

---

## Children

ReelDuel is not directed at children under 13, and we do not knowingly collect personal information from them. The app has no accounts, no messaging, and no way to send anything to a stranger — a player must be told a five-character room code by someone to join at all. If you believe a child has provided personal information through the app, email **demireldeveloper@gmail.com** and it will be deleted.

---

## Reporting offensive content

Nicknames and room names are typed by players. The app screens them against a filter, and every room carries a **Report offensive content** button that emails us the room code. We review reports and remove offending content within 24 hours. You can also email **demireldeveloper@gmail.com** directly.

---

## Where data is processed

Firestore data is stored on Google Cloud servers in the United States. If you use the app from outside the United States, your information is transferred there. Google maintains Standard Contractual Clauses for such transfers.

---

## Security

All traffic between the app, Firebase, and TMDB is encrypted in transit with HTTPS/TLS. Firestore access is governed by server-side security rules that require authentication and restrict every player to writing only their own records. No system is perfectly secure, and we cannot guarantee absolute security.

---

## Changes to this policy

If this policy changes materially we will update the date at the top and publish the new version at this URL before the change takes effect.

---

## Contact

Questions, requests, or reports: **demireldeveloper@gmail.com**
