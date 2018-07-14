package com.spring.server.service;

import com.spring.server.model.*;
import com.spring.server.repository.CommentRepository;
import com.spring.server.repository.LikeRepository;
import com.spring.server.repository.NewsRepository;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.CommentDto.CommentAddDto;
import com.spring.server.service.dto.CommentDto.CommentShowDto;
import com.spring.server.service.dto.LikeDto.LikeDto;
import com.spring.server.service.dto.NewsDto.NewsInfoDto;
import com.spring.server.service.dto.RatingDto.RatingSetDto;
import com.spring.server.service.transformer.CommentTransformer.CommentAddDtoTransformer;
import com.spring.server.service.transformer.CommentTransformer.CommentShowTransformer;
import com.spring.server.service.transformer.LikeTransformer.LikeDtoTransformer;
import com.spring.server.service.transformer.NewsTransformer.NewsEditDtoTransformer;
import com.spring.server.service.transformer.NewsTransformer.NewsInfoDtoTransformer;
import com.spring.server.service.transformer.NewsTransformer.NewsWithCommentsTransformer;
import com.spring.server.service.transformer.RatingDtoTransformer.RatingSetDtoTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final SectionService sectionService;
    private final NewsInfoDtoTransformer newsInfoDtoTransformer;
    private final NewsEditDtoTransformer newsEditDtoTransformer;
    private final CommentAddDtoTransformer commentAddDtoTransformer;
    private final CommentShowTransformer commentShowTransformer;
    private final LikeDtoTransformer likeDtoTransformer;
    private final RatingSetDtoTransformer ratingSetDtoTransformer;
    private final NewsWithCommentsTransformer newsWithCommentsTransformer;


    public List<NewsInfoDto> getNews() {
        return newsInfoDtoTransformer.makeListDto(newsRepository.findAll());
    }

    public void addPost( NewsInfoDto newsInfoDto) {
        News post = newsInfoDtoTransformer.makeModel(newsInfoDto);
        post.setPublishDate(LocalDateTime.now().toString());
        Set<Tag> tags = this.sectionService.mergeTagsToDb(newsInfoDto.getTags());
        Set<Category> categories = this.sectionService.getMergedCategories(newsInfoDto.getCategories());
        post.setTags(tags);
        post.setCategories(categories);
        this.newsRepository.save(post);
    }

    public List<NewsInfoDto> getNewsByIdUser(long id) {
        return  newsInfoDtoTransformer.makeListDto(newsRepository.findAllByUser(userRepository.findById(id)));
    }

    public NewsInfoDto getPostById(long idPost) {
        return newsInfoDtoTransformer.makeDto(newsRepository.findById(idPost));
    }

    public void editPost(NewsInfoDto newsInfoDto) {
        News news = newsEditDtoTransformer.makeEditModel(newsInfoDto);
        news.setPublishDate(LocalDateTime.now().toString());
        Set<Tag> tags = this.sectionService.mergeTagsToDb(newsInfoDto.getTags());
        news.setTags(tags);
        newsRepository.save(news);
    }

    public void deletePost(long id) {
        News deletePost = newsRepository.findById(id);
//        Set<Tag> deletedTags = deletePost.getTags();
        deletePost.setTags(null);
        deletePost.setCategories(null);
        newsRepository.save(deletePost);
        for(Comment comment : deletePost.getComments()) {
            deleteLikes(comment.getLikes());
        }
        newsRepository.delete(deletePost);
//        this.sectionService.deleteTagsWithoutLinks(deletedTags);
    }

    public void addComment(CommentAddDto commentAddDto) {
        News post = this.newsRepository.findById(commentAddDto.getId_news());
        Set<Comment> comments = new HashSet<>(post.getComments());
        comments.add(this.commentAddDtoTransformer.makeModel(commentAddDto));
        post.setComments(comments);
        this.newsRepository.save(post);
    }

    public Set<CommentShowDto> showComments(long idNews) {
        return commentShowTransformer.makeSetDto(newsRepository.findById(idNews).getComments());
    }

//    public Set<NewsWithCommentsDto> getNewsWithCommentsDto() {
//        return newsWithCommentsTransformer.makeDto(newsRepository.findAll());
//    }

    public void addLike(LikeDto likeDto) {
        Like like = this.likeDtoTransformer.makeModel(likeDto);
        Comment comment = like.getComment();
        User user = like.getUser();
        Set<Like> likes = new HashSet<>(user.getLikes());
        boolean isExist = false;
        Like delLike = new Like();
        for(Like sLike : likes) {
            if(sLike.getUser().getId().equals(user.getId())
                    && sLike.getComment().getId().equals(comment.getId())) {
                delLike = sLike;
                isExist = true;
            }
        }
        if (!isExist) {
            likes.add(like);
            comment.getUser().setAmountLike(comment.getUser().getAmountLike() + 1);
        } else {
            likes.remove(delLike);
            comment.getUser().setAmountLike(comment.getUser().getAmountLike() - 1);
        }
        comment.setLikes(likes);
        user.setLikes(likes);
        if (delLike.getId() != null) {
            likeRepository.delete(delLike);
        }
        commentRepository.save(comment);
        userRepository.save(user);
    }

    public float setPostRating(RatingSetDto ratingSetDto) {
        News news = newsRepository.findById(ratingSetDto.getIdPost());
        Boolean newRating = true;
        for(Rating rating : news.getRating()) {
            if(rating.getUser().getUsername().equals(ratingSetDto.getUsername())) {
                newRating = false;
                rating.setValue(ratingSetDto.getRating());
            }
        }
        if(newRating) {
            news.getRating().add(ratingSetDtoTransformer.makeModel(ratingSetDto));
        }
        news.setRatingValue(currentRating(news.getRating()));
        newsRepository.save(news);
        return  news.getRatingValue();
    }

    private float currentRating(Set<Rating> ratings) {
        float currentRating = 0;
        for(Rating rating : ratings) {
            currentRating += rating.getValue();
        }
        return currentRating / ratings.size();
    }

    public float getPostRating(long id) {
        return newsRepository.findById(id).getRatingValue();
    }

    public void deleteLikes(Set<Like> likes) {
        for(Like like : likes) {
            User user = like.getComment().getUser();
            user.setAmountLike(user.getAmountLike() - 1);
        }
    }

    public Set<NewsInfoDto> getNewsByIdUsername(String username) {
        return newsInfoDtoTransformer.makeSetDto(userRepository.findByUsername(username).getNews());
    }
}
