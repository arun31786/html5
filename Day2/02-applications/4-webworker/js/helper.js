/**
 * Created by Puneet on 28-01-2014.
 */

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds > new Date().getTime()) {
        // just spend time here
    }
}