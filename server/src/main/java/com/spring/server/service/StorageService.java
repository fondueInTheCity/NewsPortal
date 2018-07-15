package com.spring.server.service;

/**
 * Created by Юрий on 04.07.2018.
 */

import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import com.dropbox.core.v2.files.UploadErrorException;
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

    private static final String ACCESS_TOKEN = System.getenv("ITNEWS_DROPBOX_TOKEN");
    private DbxClientV2 client;

    public String loadFileToDropbox(MultipartFile image) {
        try (InputStream in = new FileInputStream(convert(image))) {
            String keyName = UUID.randomUUID().toString();
            FileMetadata metadata = client.files().uploadBuilder("/" + keyName)
                    .uploadAndFinish(in);
            return getPublicUrl(keyName);
        } catch (IOException e) {
            throw new JsonException("Cannot upload image file");
        } catch (UploadErrorException e) {
            throw new RuntimeException("Cannot upload image file");
        } catch (DbxException e) {
            throw new RuntimeException("Could not connect to storage!");
        }

    }

    public String getPublicUrl(String fileName) {
        try {
            init();
            SharedLinkMetadata slm = client.sharing().createSharedLinkWithSettings("/" + fileName);
            String url = slm.getUrl();
            return url.replace("?dl=0", "?raw=1");
        } catch (DbxException e) {
            throw new RuntimeException("Could not initialize storage!");
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

    public String uploadImage(MultipartFile image) {
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