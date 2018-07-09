package com.spring.server.service;

/**
 * Created by Юрий on 04.07.2018.
 */

import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import com.dropbox.core.v2.sharing.SharedLinkMetadata;
import com.spring.server.service.dto.JsonException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class StorageService {

    private static final String ACCESS_TOKEN = "0o4Bb8d0T4AAAAAAAAAABrdwWaOUfjVOQdi9oFerVgoxmp2CWS4oer8xzZpppIPo";
    private DbxClientV2 client;


    public String loadFileToDropbox(MultipartFile image) throws DbxException {
        try (InputStream in = new FileInputStream(convert(image))) {
            String keyName = UUID.randomUUID().toString();
            FileMetadata metadata = client.files().uploadBuilder("/" + keyName)
                    .uploadAndFinish(in);
            SharedLinkMetadata slm = client.sharing().createSharedLinkWithSettings("/" + keyName);
            String url = slm.getUrl();
            url = url.replace("?dl=0", "?raw=1");
            return url;
        } catch (IOException e) {
            throw new JsonException("Cannot upload image file");
        }

    }

    public File convert(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    public String uploadImage(MultipartFile image) throws DbxException {
        init();
        String publicUrl = loadFileToDropbox(image);
        return publicUrl;
    }

    public void init() {
        try {
            DbxRequestConfig config = new DbxRequestConfig("dropbox/java-tutorial", "en_US");
            this.client = new DbxClientV2(config, ACCESS_TOKEN);
        } catch (Exception e) {
            throw new RuntimeException("Could not initialize storage!");
        }
    }
}