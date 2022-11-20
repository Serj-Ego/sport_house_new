from locust import HttpUser, task

headers = {"Authorization": f"Token 9280203f2b252a5ac2d52f59874285a3efbd06911"}


class Location(HttpUser):
    @task
    def get_sport_types(self):
        self.client.get("api/location/sport-type/", headers=headers)

    @task
    def get_locations(self):
        self.client.get("api/location/list/", headers=headers)

    @task
    def get_locations_favorite(self):
        self.client.get("api/location/user-favorite/", headers=headers)


class Recommendation(HttpUser):
    @task
    def get_recomendation_user(self):
        self.client.get("api/recomendation/retrieve/", headers=headers)


class User(HttpUser):
    @task
    def get_short_info_user(self):
        self.client.get("api/user/short-info/", headers=headers)

    @task
    def get_rec_info_user(self):
        self.client.get("api/user/rec-info-user/", headers=headers)

    @task
    def get_user_notification(self):
        self.client.get("api/user/notification-list/", headers=headers)
