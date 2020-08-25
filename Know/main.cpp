#include <iostream>
#include <string>
using std::cout;
using std::endl;
using std::string;
string alphabet = "abcdefghijklmnopqrstuvwxyz";

struct node {
    char value;
    int currentAlphabetPosition;
    node *next;
    node() : value('a'), currentAlphabetPosition(0), next(nullptr){}
    void printval(){
        cout << value;
        if (next != nullptr)next->printval();
    }
    void inc() {
        if (value == 'z'){ 
            value = 'a';
            currentAlphabetPosition = 0;
            if (next != nullptr){
                next->inc();
            } else {
                next = new node();
            }
        } else {
            currentAlphabetPosition++;
            value = alphabet[currentAlphabetPosition];
        }
    }
};

int main() {
    node head = node();
    for (;;) {
        head.printval();
        head.inc();
        cout << endl;
    }
}