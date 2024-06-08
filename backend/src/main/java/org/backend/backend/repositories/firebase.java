//package org.backend.backend.repositories;
//
//import com.google.api.core.ApiFuture;
//import com.google.cloud.firestore.Firestore;
//import com.google.cloud.firestore.WriteResult;
//import com.google.firebase.cloud.FirestoreClient;
//import org.backend.backend.model.users;
//import org.springframework.stereotype.Repository;
//
//import java.util.concurrent.ExecutionException;
//
//@Repository
//public class firebase
//{
//   public   String create(users user) throws ExecutionException, InterruptedException {
//        Firestore fsdb = FirestoreClient.getFirestore();
//        ApiFuture<WriteResult> apiFuture = fsdb.collection("users").document(user.getUid()).set(user);
//        return apiFuture.get().getUpdateTime().toString();
//    }
//}
