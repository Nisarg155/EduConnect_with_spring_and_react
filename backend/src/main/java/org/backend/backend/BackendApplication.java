package org.backend.backend;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.annotations.NotNull;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;

@SpringBootApplication
public class BackendApplication {



	public static void main(String[] args) throws IOException {
		ClassLoader classLoader = BackendApplication.class.getClassLoader();
		String path = Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getPath();
		File file = new File(path);
		FileInputStream serviceAccount =
				new FileInputStream(file);
		FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.setDatabaseUrl("https://educonnect-6789e-default-rtdb.firebaseio.com")
				.build();

		FirebaseApp.initializeApp(options);

		SpringApplication.run(BackendApplication.class, args);
	}

}
